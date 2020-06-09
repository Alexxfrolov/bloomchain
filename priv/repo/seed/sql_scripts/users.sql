SELECT id, user_email as email, SUBSTRING_INDEX(display_name, " ", 1) as first_name,  SUBSTRING_INDEX(display_name, " ", -1) as last_name
from wp_users
