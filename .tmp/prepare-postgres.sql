DEALLOCATE prepare getcomponents;
PREPARE getcomponents(int) AS (
    WITH recursive _subcomponents(id) AS
(
    SELECT * , array[id] AS found_components
FROM components
WHERE id IN(WITH RECURSIVE _subcomponents(id) AS
              ( SELECT subcomponents.*, array[subcomponents.components_component] AS found_components
               FROM components_subcomponents__components_component AS subcomponents
               WHERE components_subcomponents IN ($1)
               UNION ALL SELECT subcomponents.*,
                                found_components || subcomponents.components_component
               FROM components_subcomponents__components_component AS subcomponents
               INNER JOIN _subcomponents ON _subcomponents.components_component = subcomponents.components_subcomponents
               WHERE NOT subcomponents.components_component = ANY(found_components))
            SELECT DISTINCT(components_component)
            FROM _subcomponents)
UNION ALL
SELECT components.*,
       found_components || components.id
FROM components
INNER JOIN _subcomponents ON _subcomponents."prototypeFrom" = components.id
WHERE NOT components.id = ANY(found_components))
  SELECT DISTINCT ON( id) *
  FROM
    ( SELECT *
     FROM _subcomponents
     UNION ALL SELECT *,
                      NULL
     FROM components
     WHERE id IN ($1)) AS components_w_subcomponents
);







-- OR VIA COMMAND LINE: running sails console
-- nao funciona - dar um jeito de fazer essa merda funcionar apenas chamando `EXECUTE getcomponents(2)`...
-- PREPARE getcomponents(int) AS ( WITH recursive _subcomponents(id) AS ( SELECT * , array[id] AS found_components FROM components WHERE id IN(WITH RECURSIVE _subcomponents(id) AS ( SELECT subcomponents.*, array[subcomponents.components_component] AS found_components FROM components_subcomponents__components_component AS subcomponents WHERE components_subcomponents IN ($1) UNION ALL SELECT subcomponents.*, found_components || subcomponents.components_component FROM components_subcomponents__components_component AS subcomponents INNER JOIN _subcomponents ON _subcomponents.components_component = subcomponents.components_subcomponents WHERE NOT subcomponents.components_component = ANY(found_components)) SELECT DISTINCT(components_component) FROM _subcomponents) UNION ALL SELECT components.*, found_components || components.id FROM components INNER JOIN _subcomponents ON _subcomponents."prototypeFrom" = components.id WHERE NOT components.id = ANY(found_components)) SELECT DISTINCT ON( id) * FROM ( SELECT * FROM _subcomponents UNION ALL SELECT *, NULL FROM components WHERE id IN ($1)) AS components_w_subcomponents);