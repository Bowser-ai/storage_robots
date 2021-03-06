const loop_through_pos_coords = Symbol();

class Grid
{
    constructor(max_columns, max_rows)
    {
        let instance = null;

        if (!Grid.instance) {
          this.max_columns = max_columns;
          this.max_rows = max_rows;

          this.grid_reps = [];

          for (let y = 0 ; y < this.max_rows ; ++y)
          {
              for (let x = 0 ; x < this.max_columns ; ++x)
              {
                  this.grid_reps.push(new Point(x, y));
              }
          }
          Grid.instance = this;
        }
        else {
          return Grid.instance;
        }

    }

    /*=========================================================================
     *                          PUBLIC
     *========================================================================*/

    getPossibleSteps(position)
    {
        const possible_steps = [];
        const pushCallback = (x, y, x_first = false) =>
        {
          if (x_first)
          {
            possible_steps.push(new Point(x, y));
          }
          else
          {
            possible_steps.push(new Point(y,x));
          }
        };

        this[loop_through_pos_coords](
            position.x,
            position.y,
            this.max_columns,
            pushCallback,
            true
        );

        this[loop_through_pos_coords](
            position.y,
            position.x,
            this.max_rows,
            pushCallback,
            false
        );

        return possible_steps;
    }

    /*=========================================================================
     *
     * =======================================================================*/

    getGrid()
    {
        return this.grid_reps;
    }

    /*=========================================================================
    *
    *==========================================================================*/

    isInGrid(position)
    {
      return this.grid_reps.find(
        coord => coord.x === position.x && coord.y === position.y
      ) ? true : false ;
    }

    /*=========================================================================
     *                          PRIVATE
     *========================================================================*/

    [loop_through_pos_coords](first_coord, second_coord, criterium, fn, x_first)
    {
        for (let x = first_coord - 1 , y = second_coord
            ; x <= first_coord + 1
            ; ++x
        )
        {
            if (0 <= x && x < criterium && !(x == first_coord))
            {
                fn(x, y, x_first);
            }
        }
    }
}
