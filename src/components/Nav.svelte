<script>
  let isActive = false;
  const toggleActive = () => {
    isActive = !isActive;
  };
</script>

<style>

</style>

<nav class="navbar is-black">
  <div class="navbar-brand">
    <div class="navbar-item ">
      <a href="/" class="title has-text-white">mockRabbit</a>
    </div>
    <div
      class={`navbar-burger ${isActive ? 'is-active' : ''}`}
      on:click={toggleActive}>
      <span />
      <span />
      <span />
    </div>
  </div>
  <div class={`navbar-menu ${isActive ? 'is-active' : ''}`}>
    <ul class="navbar-start">
      <a href="https://www.youtube.com/" target="_blank" class="navbar-item">
        Youtube
      </a>
      <a href="https://www.facebook.com/" target="_blank" class="navbar-item">
        Facebook
      </a>
      <a href="https://www.twitch.tv/" target="_blank" class="navbar-item">
        Twitch
      </a>
      <a href="https://www.instagram.com/" target="_blank" class="navbar-item">
        Instagram
      </a>
      <a href="https://www.discord.com/" target="_blank" class="navbar-item">
        Discord
      </a>
      <a href="https://www.twitter.com/" target="_blank" class="navbar-item">
        Twitter
      </a>
      <li class="navbar-item has-text-danger">Subscribe</li>
    </ul>
    <ul class="navbar-end">
      <a href="" class="navbar-item">Login</a>
      <a href="live" class="navbar-item">Stream</a>
    </ul>
  </div>
</nav>
