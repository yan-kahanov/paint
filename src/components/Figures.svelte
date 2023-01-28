<script>
  export let changeFigure = () => {};
  export let activeFigure = "pen";

  const figures = [
    { value: "pen", title: "Карандаш" },
    { value: "line", title: "Линия" },
    { value: "rect", title: "Прямоугльник" },
    { value: "ellipse", title: "Овал" },
    { value: "triangle", title: "Треугольник" },
  ];
</script>

<div>
  {#each figures as figure}
    <button
      class="figure"
      class:active={activeFigure === figure.value}
      on:click={() => changeFigure(figure.value)}
    >
      {figure.title}
    </button>
  {/each}
</div>

<style>
  .figure.active {
    background-color: gray;
    color: #fff;
  }
</style>
