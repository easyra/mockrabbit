<script>
  import { fly, fade } from "svelte/transition";
  export let username;
  export let text;
  export let type;
  let icon = "";
  if (type) {
    if (type === "tier-one") icon = "1";
    if (type === "tier-two") icon = "2";
    if (type === "tier-three") icon = "3";
    if (type === "tier-four") icon = "4";
    if (type === "tier-five") icon = "5";
  }
</script>

<style>
  .panel-icon {
    height: inherit;
  }
  .notification {
    padding: 10px;
    margin: 10px 0;
  }
  .icon {
    position: absolute;
    right: 0;
    top: 0;
    margin: 3px 3px 0 0;
    font-size: 18px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    color: rgba(0, 0, 0, 0.5);
    font-family: "Merienda", cursive;
  }
  .tier-one {
    background: #ffd740;
    color: rgba(0, 0, 0, 0.7);
  }
  .tier-two {
    background: #ffab40;
    color: rgba(0, 0, 0, 0.7);
  }
  .tier-three {
    color: rgba(0, 0, 0, 0.7);
    background: #ff6e40;
  }
  .tier-four {
    color: rgba(0, 0, 0, 0.7);
    background: #ff8a80;
  }
  .tier-five {
    background: #ea80fc;
    color: rgba(0, 0, 0, 0.7);
  }
</style>

<div class={`notification ${type}`} in:fly={{ x: 200, duration: 500 }}>
  {#if icon !== ''}
    <!-- <span class="icon">{icon}</span> -->
  {/if}
  <p class="is-size-7">
    <strong>{username}:</strong>
    {text}
  </p>

</div>
