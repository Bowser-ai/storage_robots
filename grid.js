const loop_through_pos_coords = Symbol();

class Grid
{
    constructor(max_columns, max_rows)
    {
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
    }

    /*=========================================================================
     *                          PUBLIC
     *========================================================================*/

    getPossibleStep(position)
    {
        const possible_steps = [];
        const callback = (x, y) => 
        {
            possible_steps.push(new Point(x, y));
        };

        this[loop_through_pos_coord](
            position.x, 
            position.y, 
            this.max_columns,
            callback
        );

        this[loop_through_pos_coord](
            position.y, 
            position.x, 
            this.max_rows,
            callback
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
     *                          PRIVATE
     *========================================================================*/

    [loop_through_pos_coords](first_coord, second_coord, criterium, fn) 
    {
        for (let x = first_coord - 1 , y = second_coord
            ; x <= first_coord + 1 
            ; ++x
        )
        {
            if (0 <= x && x < criterium && !(x == first_coord))
            {
                fn(x, y);
            }
        }
    }
}


