import settings from "./settings";

const figures = [
  {
    value: "pen",
    title: "Карандаш",
    action: (ctx, startPos, currPosX, currPosY, setPosition) => {
      ctx.moveTo(startPos.x, startPos.y);
      setPosition();
      ctx.lineTo(startPos.x, startPos.y);
    },
  },
  {
    value: "line",
    title: "Линия",
    action: (ctx, startPos, currPosX, currPosY) => {
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(currPosX, currPosY);
    },
  },
  {
    value: "rect",
    title: "Прямоугльник",
    action: (ctx, startPos, currPosX, currPosY) => {
      if (settings.isFill) {
        ctx.fillRect(
          startPos.x,
          startPos.y,
          currPosX - startPos.x,
          currPosY - startPos.y
        );
      }
      ctx.rect(
        startPos.x,
        startPos.y,
        currPosX - startPos.x,
        currPosY - startPos.y
      );
    },
  },
  {
    value: "ellipse",
    title: "Овал",
    action: (ctx, startPos, currPosX, currPosY) => {
      const width = Math.abs(currPosX - startPos.x);
      const height = Math.abs(currPosY - startPos.y);
      ctx.save();
      ctx.translate(startPos.x, startPos.y);
      ctx.scale(1, height / width);
      ctx.arc(0, 0, width, 0, Math.PI * 2);
      ctx.restore();
      if (settings.isFill) {
        ctx.fill();
      }
    },
  },
  {
    value: "triangle",
    title: "Треугольник",
    action: (ctx, startPos, currPosX, currPosY) => {
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(currPosX, currPosY);
      ctx.lineTo(startPos.x - (currPosX - startPos.x), currPosY);
      if (settings.isFill) {
        ctx.fill();
      }
      ctx.closePath();
    },
  },
];

export default figures;
