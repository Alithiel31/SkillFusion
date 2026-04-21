<script>
let props = $props()

</script>
<div>
{#if props.level == 0}
<div class="diff-card">
        <div class="bars">
          <div class="bar" style="height:10px; background:#3B6D11;"></div>
          <div class="bar" style="height:14px; background:#C0DD97;"></div>
          <div class="bar" style="height:18px; background:#C0DD97;"></div>
          <div class="bar" style="height:22px; background:#C0DD97;"></div>
          <div class="bar" style="height:25px; background:#C0DD97;"></div>
        </div>
        <p class="diff-name" style="color:#27500A;">Débutant</p>
      </div>
{:else if props.level == 1}
      <div class="diff-card">
        <div class="bars">
          <div class="bar" style="height:10px; background:#0F6E56;"></div>
          <div class="bar" style="height:14px; background:#0F6E56;"></div>
          <div class="bar" style="height:18px; background:#9FE1CB;"></div>
          <div class="bar" style="height:22px; background:#9FE1CB;"></div>
          <div class="bar" style="height:25px; background:#9FE1CB;"></div>
        </div>
        <p class="diff-name" style="color:#085041;">Facile</p>
      </div>
{:else if props.level == 2}
      <div class="diff-card">
        <div class="bars">
          <div class="bar" style="height:10px; background:#854F0B;"></div>
          <div class="bar" style="height:14px; background:#854F0B;"></div>
          <div class="bar" style="height:18px; background:#854F0B;"></div>
          <div class="bar" style="height:22px; background:#FAC775;"></div>
          <div class="bar" style="height:25px; background:#FAC775;"></div>
        </div>
        <p class="diff-name" style="color:#633806;">Intermédiaire</p>
      </div>
{:else if props.level == 3}
      <div class="diff-card">
        <div class="bars">
          <div class="bar" style="height:10px; background:#993C1D;"></div>
          <div class="bar" style="height:14px; background:#993C1D;"></div>
          <div class="bar" style="height:18px; background:#993C1D;"></div>
          <div class="bar" style="height:22px; background:#993C1D;"></div>
          <div class="bar" style="height:25px; background:#F5C4B3;"></div>
        </div>
        <p class="diff-name" style="color:#712B13;">Difficile</p>
      </div>
{:else if props.level == 4}
      <div class="diff-card" >
        <div class="bars">
          <div class="bar" style="height:10px; background:#A32D2D;"></div>
          <div class="bar" style="height:14px; background:#A32D2D;"></div>
          <div class="bar" style="height:18px; background:#A32D2D;"></div>
          <div class="bar" style="height:22px; background:#A32D2D;"></div>
          <div class="bar" style="height:25px; background:#A32D2D;"></div>
        </div>
        <p style="color:#791F1F;">Expert</p>
      </div>
{/if}
</div>
<style>
 .bars { 
        display: flex; 
        gap: 3px;
         align-items: flex-end;
          height: 24px;
          width: 50%;
}
    .bar {
         width: 8px; 
         border-radius: 2px; 
         }
         .diff-card {
      flex: 1;
      min-width: 30px;
      padding: 0px 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;

    }
    p{
        font-size: 12px;
        font-weight: bold;
    }
</style>