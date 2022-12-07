class DiscordUser {
    constructor( 
      public name: string, 
      public discriminator: string,
      public id: string 
    ) {}
  
    fullName() {
      return this.name + "#" + this.discriminator
    }
  }
  
  export let user = new DiscordUser("afn", '0128', '420043923822608384');