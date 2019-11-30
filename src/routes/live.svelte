<script>
  import Embed from "../components/Embed.svelte";
  import ChatMenu from "../components/chat/ChatMenu.svelte";
</script>

<style>
  section {
    margin: 15px;
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
      <ChatMenu />
    </div>
  </div>
</section>
