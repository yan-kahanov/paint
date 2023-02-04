<script>
  import settings from '../settings' 
  import figures from '../figures' 

  const changeFigure = (figure) => {
    settings.figure = figure.value
  }
</script>

<div>
  {#each figures as figure}
    <button
      class="figure"
      class:active={settings.figure === figure.value}
      on:click={() => changeFigure(figure)}
    >
      {figure.title}
    </button>
  {/each}
</div>

<style>
  .figure{
    user-select: none;
  }
  .figure.active {
    background-color: gray;
    color: #fff;
  }
</style>
