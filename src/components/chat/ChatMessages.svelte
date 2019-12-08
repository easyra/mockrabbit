<script>
  import ChatMessage from "./ChatMessage.svelte";
  import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
  import "nanoscroller/bin/css/nanoscroller.css";
  import { onMount } from "svelte";
  import jquery from "jquery";

  let messages = [];

  onMount(async () => {
    const nanoScroller = await import("nanoscroller");
    jquery(".nano").nanoScroller();
    jquery(".nano").nanoScroller({ scroll: "bottom" });
  });

  const addMessage = async () => {
    messages = await [...messages, 1];
    await jquery(".nano").nanoScroller();
    jquery(".nano").nanoScroller({ scrollBottom: 0 });
    jquery(".nano").nanoScroller();
    jquery(".nano").nanoScroller({ scrollBottom: 0 });
  };
</script>

<style>
  .nano-content {
    overflow-y: scroll;
    overflow-x: hidden;
    position: absolute;
  }
  .chat {
    min-height: 300px;
    width: 100%;
    position: relative;
    overflow: auto;
    overflow-x: hidden;
    height: 100% !important;
    max-height: 85%;
  }
</style>

<button on:click={addMessage}>add message</button>
<div class="nano chat">
  <div class="nano-content" id="container">
    <ChatMessage />
    {#each messages as message}
      <ChatMessage />
    {/each}
  </div>
  <div class="nano-panel">
    <div class="nano-slider" />
  </div>
</div>
