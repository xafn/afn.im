<script lang="ts">
	import { onMount } from 'svelte';

	const CELL_SIZE = 7;
	const SEED_RADIUS = 2;
	const STEP_MS = 72;
	const FADE = 0.74;
	const INITIAL_CLUSTER_COUNT = 22;
	const BASE_INTENSITY = 0.38;
	const BURST_DECAY = 0.72;
	const CURSOR_SEED_DENSITY = 0.86;
	const HERO_AFFAN_ANIMATION_MS = 1700;
	const INTRO_DURATION_MS = 1300;
	const INTRO_ISLAND_LIFECYCLE_MS = 430;
	const INTRO_ISLAND_RIPPLE_STEPS = 5;

	type IntroIsland = {
		x: number;
		y: number;
		startOffset: number;
		activated: boolean;
		lastRippleStep: number;
	};

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			return;
		}

		const context = canvas.getContext('2d', { alpha: true });
		if (!context) {
			return;
		}

		let pageWidth = 0;
		let cols = 0;
		let rows = 0;
		let alive = new Uint8Array(0);
		let next = new Uint8Array(0);
		let heat = new Float32Array(0);
		let burst = new Float32Array(0);
		let rafId = 0;
		let lastStep = 0;
		let resizeRafId = 0;
		let activationTimeoutId: number | null = null;
		let isPointerDown = false;
		let introStartTime: number | null = null;
		let introIslands: IntroIsland[] = [];

		const index = (x: number, y: number) => y * cols + x;

		const inBounds = (x: number, y: number) => x >= 0 && x < cols && y >= 0 && y < rows;

		const getDocumentHeight = () =>
			Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight,
				window.innerHeight
			);

		const seedCell = (x: number, y: number, strength: number, burstStrength = 0) => {
			if (!inBounds(x, y)) {
				return;
			}

			const idx = index(x, y);
			alive[idx] = 1;
			heat[idx] = Math.max(heat[idx], strength);
			if (burstStrength > 0) {
				burst[idx] = Math.max(burst[idx], burstStrength);
			}
		};

		const seedCluster = (
			cx: number,
			cy: number,
			intensity = BASE_INTENSITY,
			burstStrength = 0,
			density = 1
		) => {
			for (let y = -SEED_RADIUS; y <= SEED_RADIUS; y += 1) {
				for (let x = -SEED_RADIUS; x <= SEED_RADIUS; x += 1) {
					const distance = Math.hypot(x, y);
					const chance = Math.max(0.1, (0.38 - distance * 0.1) * density);
					if (Math.random() < chance) {
						seedCell(cx + x, cy + y, intensity, burstStrength);
					}
				}
			}
		};

		const seedInitialWorld = (
			count = INITIAL_CLUSTER_COUNT,
			intensity = 0.4,
			density = 0.72,
			burstStrength = 0
		) => {
			if (cols <= 0 || rows <= 0) {
				return;
			}

			for (let i = 0; i < count; i += 1) {
				const cx = Math.floor(Math.random() * cols);
				const cy = Math.floor(Math.random() * rows);
				seedCluster(cx, cy, intensity, burstStrength, density);
			}
		};

		const seedRing = (
			cx: number,
			cy: number,
			radius: number,
			intensity: number,
			burstStrength: number,
			density = 1
		) => {
			const points = Math.max(24, Math.floor(radius * 7));
			for (let i = 0; i < points; i += 1) {
				const angle = (i / points) * Math.PI * 2;
				const jitter = (Math.random() - 0.5) * 1.35;
				const r = Math.max(1, radius + jitter);
				const x = Math.round(cx + Math.cos(angle) * r);
				const y = Math.round(cy + Math.sin(angle) * r);

				if (Math.random() < density) {
					seedCell(x, y, intensity, burstStrength);
				}
			}
		};

		const startIntroRipple = () => {
			introStartTime = performance.now();
			introIslands = [];

			for (let i = 0; i < INITIAL_CLUSTER_COUNT; i += 1) {
				const x = Math.floor(Math.random() * cols);
				const y = Math.floor(Math.random() * rows);
				const distributedStart = (i / INITIAL_CLUSTER_COUNT) * (INTRO_DURATION_MS * 0.88);
				const startOffset = Math.max(0, distributedStart + (Math.random() - 0.5) * 120);

				introIslands.push({
					x,
					y,
					startOffset,
					activated: false,
					lastRippleStep: -1
				});
			}
		};

		const runIntroRipple = (time: number) => {
			if (introStartTime === null) {
				return;
			}

			const elapsed = time - introStartTime;

			for (const island of introIslands) {
				const localElapsed = elapsed - island.startOffset;
				if (localElapsed < 0) {
					continue;
				}

				const progress = Math.min(1, localElapsed / INTRO_ISLAND_LIFECYCLE_MS);
				const rippleStep = Math.min(
					INTRO_ISLAND_RIPPLE_STEPS - 1,
					Math.floor(progress * INTRO_ISLAND_RIPPLE_STEPS)
				);

				if (rippleStep > island.lastRippleStep) {
					const radius = 1 + rippleStep * 1.3;
					const intensity = Math.max(0.34, 0.72 - rippleStep * 0.08);
					const burstStrength = Math.max(0.32, 0.95 - rippleStep * 0.14);
					const density = Math.max(0.34, 0.72 - rippleStep * 0.1);
					seedRing(island.x, island.y, radius, intensity, burstStrength, density);
					island.lastRippleStep = rippleStep;
				}

				if (!island.activated && progress >= 0.35) {
					seedCluster(island.x, island.y, 0.46, 0.62, 0.7);
					island.activated = true;
				}
			}

			if (elapsed >= INTRO_DURATION_MS + INTRO_ISLAND_LIFECYCLE_MS) {
				introStartTime = null;
				seedInitialWorld(10, 0.36, 0.5, 0);
			}
		};

		const resize = (preserveState = true) => {
			const dpr = Math.max(1, window.devicePixelRatio || 1);
			const width = document.documentElement.clientWidth;
			const docHeight = getDocumentHeight();

			pageWidth = width;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${docHeight}px`;

			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(docHeight * dpr);

			context.setTransform(dpr, 0, 0, dpr, 0, 0);

			const newCols = Math.ceil(width / CELL_SIZE);
			const newRows = Math.ceil(docHeight / CELL_SIZE);

			if (!preserveState || newCols !== cols || newRows !== rows) {
				const prevCols = cols;
				const prevRows = rows;
				const prevAlive = alive;
				const prevHeat = heat;

				cols = newCols;
				rows = newRows;
				alive = new Uint8Array(cols * rows);
				next = new Uint8Array(cols * rows);
				heat = new Float32Array(cols * rows);
				burst = new Float32Array(cols * rows);

				if (preserveState && prevCols > 0 && prevRows > 0) {
					const copyCols = Math.min(prevCols, cols);
					const copyRows = Math.min(prevRows, rows);

					for (let y = 0; y < copyRows; y += 1) {
						for (let x = 0; x < copyCols; x += 1) {
							const oldIdx = y * prevCols + x;
							const newIdx = y * cols + x;
							alive[newIdx] = prevAlive[oldIdx];
							heat[newIdx] = prevHeat[oldIdx];
							burst[newIdx] = 0;
						}
					}
				}
			}
		};

		const seedAt = (pageX: number, pageY: number) => {
			const cx = Math.floor(pageX / CELL_SIZE);
			const cy = Math.floor(pageY / CELL_SIZE);
			seedCluster(cx, cy, BASE_INTENSITY + 0.1, 0.72, CURSOR_SEED_DENSITY);
		};

		const step = () => {
			for (let y = 0; y < rows; y += 1) {
				for (let x = 0; x < cols; x += 1) {
					const idx = index(x, y);
					let neighbors = 0;

					for (let oy = -1; oy <= 1; oy += 1) {
						for (let ox = -1; ox <= 1; ox += 1) {
							if (ox === 0 && oy === 0) {
								continue;
							}

							const nx = x + ox;
							const ny = y + oy;
							if (inBounds(nx, ny)) {
								neighbors += alive[index(nx, ny)];
							}
						}
					}

					const isAlive = alive[idx] === 1;
					next[idx] = neighbors === 3 || (isAlive && neighbors === 2) ? 1 : 0;
				}
			}

			const temp = alive;
			alive = next;
			next = temp;
		};

		const render = (time: number) => {
			runIntroRipple(time);

			if (time - lastStep >= STEP_MS) {
				const requiredRows = Math.ceil(getDocumentHeight() / CELL_SIZE);
				if (requiredRows !== rows) {
					resize(true);
				}

				step();
				lastStep = time;
			}

			const scrollY = window.scrollY;
			const startRow = Math.max(0, Math.floor(scrollY / CELL_SIZE) - 2);
			const visibleRows = Math.ceil(window.innerHeight / CELL_SIZE) + 4;
			const endRow = Math.min(rows, startRow + visibleRows);
			const clearY = startRow * CELL_SIZE;
			const clearHeight = (endRow - startRow) * CELL_SIZE;

			context.clearRect(0, clearY, pageWidth, clearHeight);

			for (let y = startRow; y < endRow; y += 1) {
				for (let x = 0; x < cols; x += 1) {
					const idx = index(x, y);

					if (alive[idx] === 1) {
						heat[idx] = Math.max(heat[idx], BASE_INTENSITY);
					} else {
						heat[idx] *= FADE;
					}

					burst[idx] *= BURST_DECAY;

					const alpha = heat[idx] * 0.21 + burst[idx] * 0.29;
					if (alpha < 0.03) {
						continue;
					}

					context.fillStyle = `rgba(255, 255, 255, ${Math.min(0.26, alpha)})`;
					context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
				}
			}

			rafId = window.requestAnimationFrame(render);
		};

		const handlePointerMove = (event: PointerEvent) => {
			if (!isPointerDown) {
				return;
			}

			seedAt(event.pageX, event.pageY);
		};

		const handlePointerDown = (event: PointerEvent) => {
			isPointerDown = true;
			seedAt(event.pageX, event.pageY);
		};

		const handlePointerUp = () => {
			isPointerDown = false;
		};

		const handleResize = () => {
			if (resizeRafId !== 0) {
				return;
			}

			resizeRafId = window.requestAnimationFrame(() => {
				resizeRafId = 0;
				resize(true);
			});
		};

		resize(false);

		window.addEventListener('resize', handleResize);

		activationTimeoutId = window.setTimeout(() => {
			resize(true);
			startIntroRipple();

			window.addEventListener('pointerdown', handlePointerDown, { passive: true });
			window.addEventListener('pointerup', handlePointerUp, { passive: true });
			window.addEventListener('pointercancel', handlePointerUp, { passive: true });
			window.addEventListener('pointermove', handlePointerMove, { passive: true });
			rafId = window.requestAnimationFrame(render);
		}, HERO_AFFAN_ANIMATION_MS);

		return () => {
			window.cancelAnimationFrame(rafId);
			if (activationTimeoutId !== null) {
				window.clearTimeout(activationTimeoutId);
			}
			if (resizeRafId !== 0) {
				window.cancelAnimationFrame(resizeRafId);
			}
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('pointerup', handlePointerUp);
			window.removeEventListener('pointercancel', handlePointerUp);
			window.removeEventListener('pointermove', handlePointerMove);
		};
	});
</script>

<canvas bind:this={canvas} class="cursor-life-canvas" aria-hidden="true" />

<style lang="scss">
	.cursor-life-canvas {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		pointer-events: none;
		z-index: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.cursor-life-canvas {
			display: none;
		}
	}
</style>
