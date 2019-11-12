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
      <h1 class="title has-text-white">mockRabbit</h1>
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
      <li class="navbar-item">Youtube</li>
      <li class="navbar-item">Facebook</li>
      <li class="navbar-item">Twitch</li>
      <li class="navbar-item">Instagram</li>
      <li class="navbar-item">Discord</li>
      <li class="navbar-item">Twitter</li>
      <li class="navbar-item has-text-danger">Subscribe</li>
    </ul>
    <ul class="navbar-end">
      <li class="navbar-item">Login</li>
      <lil class="navbar-item">Stream</lil>
    </ul>
  </div>
</nav>
