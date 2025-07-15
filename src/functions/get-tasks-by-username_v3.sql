CREATE OR REPLACE FUNCTION public.get_tasks_by_username_v3(
    input_username TEXT
)
RETURNS TABLE (
    id INT,
    task_name TEXT,
    task_priority TEXT,
    istaskcompleted BOOLEAN,
    task_deadline DATE,
    remaining_days TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.id,
        t.task_name,
        t.task_priority,
        t.istaskcompleted,
        t.task_deadline,
        CASE 
            WHEN t.task_deadline IS NULL THEN 'No deadline'
            WHEN t.task_deadline >= CURRENT_DATE THEN (t.task_deadline - CURRENT_DATE)::TEXT
            ELSE 'Overdue'
        END AS remaining_days
    FROM
        users u
    JOIN
        tasks t ON u.id = t.user_id
    WHERE
        u.username = input_username;
END;
$$ LANGUAGE plpgsql;
