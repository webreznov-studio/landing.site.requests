CREATE TABLE public.wr_status_requests (
	id varchar(20) NOT NULL,
	id_request varchar(20) NOT NULL,
	date_read varchar NULL,
	is_read boolean NULL DEFAULT false,
	has_replay boolean NULL DEFAULT false,
	is_closed boolean NULL DEFAULT false
);

-- Column comments

COMMENT ON COLUMN public.wr_status_requests.is_read IS 'Is this request was reading?';
COMMENT ON COLUMN public.wr_status_requests.has_replay IS 'is this request has replay?';