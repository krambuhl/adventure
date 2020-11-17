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
  const classList = classnames('root', className)
  const rows = Array.from({ length: rowsLength }).map((_, x) => x)
  const columns = Array.from({ length: columnsLength }).map((_, x) => x)

  return (
    <>
      <div className={classList} {...props}>
        {
          rows.map(y => {
            return (
              <div key={y} className="row">
                {
                  columns.map(x => {
                    const style = getCellStyle({ x, y })

                    return (
                      <div
                        key={x}
                        className="cell"
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

      <style jsx>{`
        .root {
          display: flex;
          flex-flow: column wrap;
          align-content: center;
          padding: var(--space-md);
          width: 100%;
        }

        .row {
          display: flex;
          margin-top: 0px;
          justify-content: center;
          width: 100%;
        }

        .cell {
          width: ${cellSize[0]};
          height: ${cellSize[1]};
          background-color: white;
          color: black;
        }

        @media (max-width: 720px) {
          .root {
            flex-flow: row-reverse wrap;
          }

          .row {
            flex-flow: column-reverse wrap;
            margin-top: 0;
            margin-left: 0px;
            width: auto
          }

          .cell {
            width: ${mobileCellSize[0]};
            height: ${mobileCellSize[1]};
          }
        }
      `}</style>
    </>
  )
}
