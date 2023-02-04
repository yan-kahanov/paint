<script>
  import settings from '../settings'
</script>

<div class="panel-top">
  <input
    class="input-line-width"
    bind:value={settings.lineWidth}
    type="number"
    placeholder="Толщина (px)"
  />
  <input type="color" class="color-picker" bind:value={settings.strokeColor} />
  <input type="color" class="color-picker" bind:value={settings.fillColor} />
  <div class="fill-toggle">
    <input id="fillToggle" type="checkbox" bind:checked={settings.isFill} />
    <label for="fillToggle">С заливкой</label>
  </div>
</div>

<style>
  .color-picker {
    padding: 0;
    cursor: pointer;
  }
  .fill-toggle {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .fill-toggle input,
  .fill-toggle label {
    cursor: pointer;
    margin: 0;
    user-select: none;
  }
  .panel-top {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
  }
  .input-line-width {
    user-select: none;
  }
</style>
