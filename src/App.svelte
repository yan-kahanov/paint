<script>
  import Canvas from "./components/Canvas.svelte";
  import Figures from "./components/Figures.svelte";
  import PanelTop from "./components/PanelTop.svelte";
  import Toolbar from "./components/Toolbar.svelte";

  let canvasWrap = null;


</script>

<main>
  <div>
    <Toolbar
      canvas={canvasWrap?.canvas}
      ctx={canvasWrap?.ctx}
      setCanvasScreenshot={canvasWrap?.setCanvasScreenshot}
    />
    <PanelTop />
    <Figures />
  </div>
  <Canvas bind:this={canvasWrap} />
</main>
