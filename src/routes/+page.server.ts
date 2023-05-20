import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import type { Edge, PinnedRepo } from '../util/types';
import { SECRET_API_KEY } from '$env/static/private';

async function getPinnedRepos(username: string): Promise<PinnedRepo[]> {
	const query = `
    query {
      repositoryOwner(login: "${username}") {
        ... on User {
          pinnedItems(first: 6, types: REPOSITORY) {
            edges {
              node {
                ... on Repository {
                  name: nameWithOwner
                  owner: owner {
                    avatarUrl
                    login
                  }
                  stars: stargazerCount
                  forks: forkCount
                  url
                  description
                  primaryLanguage {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

	const response = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${SECRET_API_KEY}`
		},
		body: JSON.stringify({ query })
	});

	const json = await response.json();
	const pinnedRepos: PinnedRepo[] = json.data.repositoryOwner.pinnedItems.edges.map(
		(edge: Edge) => edge.node
	);
	return pinnedRepos;
}

export const load: PageServerLoad = async () => {
	const repos = await getPinnedRepos('xafn');
	return { repos };
};
