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

  return (
    <>
      <div className={classList} {...props}>
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

      <style jsx>{`
        .cell {
          width: ${cellSize[0]};
          height: ${cellSize[1]};
        }

        @media (max-width: 720px) {
          .cell {
            width: ${mobileCellSize[0]};
            height: ${mobileCellSize[1]};
          }
        }
      `}</style>
    </>
  )
}
