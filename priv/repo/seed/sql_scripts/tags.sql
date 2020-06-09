SELECT t1.term_id as id, t1.`name`, t1.slug
from wp_term_taxonomy t0
INNER JOIN wp_terms t1 on t0.term_id = t1.term_id
where t0.taxonomy = "post_tag"
