SELECT p0.id, p0.post_date_gmt as published_at, p0.post_author as author_id, p0.post_content as body, p0.post_title as title, p0.post_name as slug, t1.slug as "type", GROUP_CONCAT(CAST(t2.term_id as CHAR)) as tags, v.pageviews as total_views, p1.guid as cover, m2.meta_value as cover_alt, m3.meta_value as description
FROM wp_posts p0

inner join wp_term_relationships r on r.object_id = p0.id
inner join wp_term_relationships r1 on r1.object_id = p0.id
inner join wp_term_taxonomy t0 on r.term_taxonomy_id = t0.term_taxonomy_id and t0.taxonomy = "category"
inner join wp_terms t1 on t0.term_id = t1.term_id

inner join wp_term_taxonomy t2 on r1.term_taxonomy_id = t2.term_taxonomy_id and t2.taxonomy = "post_tag"
inner join wp_popularpostsdata v on p0.id = v.postid

inner join wp_postmeta m1 on m1.post_id = p0.id and m1.meta_key = "_thumbnail_id"
inner join wp_posts p1 on p1.id = m1.meta_value
left join wp_postmeta m2 on m2.post_id = p1.ID and m2.meta_key = "_wp_attachment_image_alt"

left join wp_postmeta m3 on m3.post_id = p0.ID and m3.meta_key = "_yoast_wpseo_metadesc"

GROUP BY id, published_at, author_id, body, title, slug, "type", cover, cover_alt, description
order BY published_at desc

limit 1000
