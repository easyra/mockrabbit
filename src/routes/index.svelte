<script>
  import Embed from "../components/Embed.svelte";
  const dummyTweets = [];
  for (let i = 0; i < 5; i++) {
    dummyTweets.push({
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
          reiciendis, magni nesciunt dolorem error distinctio.`
    });
  }
</script>

<style>
  i {
    margin-right: 15px;
  }
  .button {
    margin: 15px 0;
  }
  .thumbnail {
    /* width: 300px; */
  }
  .socials {
    display: flex;
    justify-content: space-around;
  }
</style>

<svelte:head>
  <title>mockRabbit | Politics, Tech, and Art Streams</title>
</svelte:head>
<section class="hero is-black ">
  <div class="hero-body">
    <div class="columns is-vcentered is-centered">

      <div class="column is-half">
        <p class="title is-1">Join the den...</p>
        <p class="subtitle is-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
          reiciendis, magni nesciunt dolorem error distinctio.
        </p>
        <a href="subscribe" class="button is-large is-danger">Subscribe Now</a>
      </div>

      <div class="column is-one-third">
        <Embed url={'https://www.youtube.com/embed/x5-JVvCrGC8'} />
        <a href="live" class="button is-primary is-large is-fullwidth">
          Watch More
        </a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <nav class="level">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Posts</p>
        <p class="title">0</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Followers</p>
        <p class="title">0</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <p class="title">November</p>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Subscribers</p>
        <p class="title">0</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Donations</p>
        <p class="title">0</p>
      </div>
    </div>
  </nav>
  <div class="socials">
    <i class="fab fa-youtube fa-5x" />
    <i class="fab fa-facebook fa-5x" />
    <i class="fab fa-twitch fa-5x" />
    <i class="fab fa-instagram fa-5x" />
    <i class="fab fa-discord fa-5x" />
    <i class="fab fa-twitter fa-5x" />
  </div>
</section>

<section class="hero">
  <div class="hero-body">
    <div class="columns">
      <div class="column">
        <img
          src="https://i.ytimg.com/vi/5NqitWbBim8/maxresdefault.jpg"
          class="thumbnail"
          alt="" />
      </div>
      <div class="column">
        <img
          src="https://i.ytimg.com/vi/5NqitWbBim8/maxresdefault.jpg"
          class="thumbnail"
          alt="" />
      </div>
      <div class="column">
        <img
          src="https://i.ytimg.com/vi/5NqitWbBim8/maxresdefault.jpg"
          class="thumbnail"
          alt="" />
      </div>
      <div class="column">
        <img
          src="https://i.ytimg.com/vi/5NqitWbBim8/maxresdefault.jpg"
          class="thumbnail"
          alt="" />
      </div>
      <div class="column">
        <img
          src="https://i.ytimg.com/vi/5NqitWbBim8/maxresdefault.jpg"
          class="thumbnail"
          alt="" />
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="columns">
    <div class="column">
      <article class="panel is-primary">
        <p class="panel-heading ">Tweets</p>
        {#each dummyTweets as dummyTweet}
          <a href="https://www.twitter.com" class="panel-block">
            <span class="panel-icon">
              <i class="fab fa-twitter" />
            </span>
            {dummyTweet.text}
          </a>
        {/each}

      </article>
    </div>
    <div class="column">
      <article class="panel is-primary">
        <p class="panel-heading">Tweets</p>
        {#each dummyTweets as dummyTweet}
          <a href="https://www.twitter.com" class="panel-block">
            <span class="panel-icon">
              <i class="fab fa-twitter" />
            </span>
            {dummyTweet.text}
          </a>
        {/each}
      </article>
    </div>
    <div class="column">
      <article class="panel is-primary">
        <p class="panel-heading">Tweets</p>
        {#each dummyTweets as dummyTweet}
          <a href="https://www.twitter.com" class="panel-block">
            <span class="panel-icon">
              <i class="fab fa-twitter" />
            </span>
            {dummyTweet.text}
          </a>
        {/each}
      </article>
    </div>
  </div>
</section>
