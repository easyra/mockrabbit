<script>
  import Embed from "../components/Embed.svelte";
</script>

<style>
  section {
    margin: 15px;
  }
  .chat {
    /* position: relative;   */
  }
  .panel {
    height: 100%;
    min-height: 300px;
    width: 100%;
  }
  .panel-icon {
    height: inherit;
  }
  .fas {
    cursor: pointer;
  }
</style>

<svelte:head>
  <title>Livestream</title>
</svelte:head>

<section class="">
  <div class="columns">
    <div class="column is-three-quarters">
      <Embed url="https://www.youtube.com/embed/x5-JVvCrGC8" />
    </div>
    <div class="column is-one-fifths chat">

      <div class="panel is-black">
        <p class="panel-heading ">Chat</p>
        <p class="panel-tabs">
          <a class="is-active">Chat</a>
          <a>Donate</a>
          <a href="">Settings</a>
        </p>
        <div class="panel-block">
          <p class="is-7">
            <span class="tag is-info">username</span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            natus officiis in assumenda maiores temporibus.
          </p>
          <span class="panel-icon">
            <i class="fas fa-caret-up" />
            0
            <i class="fas fa-caret-down" />
          </span>
        </div>
        <div class="panel-block">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis natus
          officiis in assumenda maiores temporibus.
        </div>
      </div>
    </div>
  </div>
</section>
