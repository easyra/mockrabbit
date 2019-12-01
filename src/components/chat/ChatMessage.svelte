<script>
  const classes = [
    "",
    "",
    "",
    "",
    "is-danger",
    "is-warning",
    "is-info",
    "is-primary"
  ];
  const className = classes[Math.floor(Math.random() * classes.length)];
</script>

<style>
  .panel-icon {
    height: inherit;
  }
  .notification {
    padding: 10px;
    margin: 10px 0;
  }
</style>

<div class={`notification ${className}`}>
  <p class="is-size-6">
    <strong>Username:</strong>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis natus
    officiis in assumenda maiores temporibus.
  </p>

</div>
