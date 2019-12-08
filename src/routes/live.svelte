<script>
  import Embed from "../components/Embed.svelte";
  import ChatMenu from "../components/chat/ChatMenu.svelte";
</script>

<style>
  section {
    padding: 15px;
  }
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
  }
</style>

<svelte:head>
  <title>Livestream</title>
</svelte:head>

<!-- <div class="background" /> -->

<section class="">
  <div class="columns">
    <div class="column is-three-quarters">
      <Embed url="https://www.youtube.com/embed/x5-JVvCrGC8" />
    </div>
    <div class="column is-one-fifths chat">
      <ChatMenu />
    </div>
  </div>
</section>
