import classnames from "classnames";
import css from "./PolarGrid.module.css";

export default function PolarGrid({
  count: length = 1000,
  radius = 250,
  getCellStyle,
  className,
  ...props
}) {
  const classList = classnames(css.root, className);
  const items = Array.from({ length }).map((_, x) => x);

  const style = {
    '--radius': `${radius}px`
  };

  return (
    <div className={classList} style={style} {...props}>
      <div className={css.grid}>
        <div className={css.gridSizer} />
        {items.map((i) => {
          const cell = getCellStyle(i, length);

          return (
            <div
              key={i}
              className={classnames(css.cell, "cell")}
              style={cell}
            />
          );
        })}
      </div>
    </div>
  );
}
