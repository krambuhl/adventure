import classnames from 'classnames'
import css from './Grid.module.css'

export default function Grid ({
  rows: rowsLength,
  columns: columnsLength,
  cellSize,
  mobileCellSize,
  getCellStyle,
  className,
  ...props
}) {
  const classList = classnames(css.root, className)
  const rows = Array.from({ length: rowsLength }).map((_, x) => x)
  const columns = Array.from({ length: columnsLength }).map((_, x) => x)

  const style = {
    '--width': cellSize[0],
    '--height': cellSize[1],
    '--mobile-width': mobileCellSize[0],
    '--mobile-height': mobileCellSize[1],
  }

  return (
    <div className={classList} style={style} {...props}>
      <div className={css.grid}>
        {
          rows.map(y => {
            return (
              <div key={y} className={css.row}>
                {
                  columns.map(x => {
                    const style = getCellStyle({ x, y })

                    return (
                      <div
                        key={x}
                        className={classnames(css.cell, 'cell')}
                        style={style}
                      />
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
