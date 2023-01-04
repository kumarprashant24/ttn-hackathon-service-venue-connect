/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.customers
(
    id serial NOT NULL,
    account_number integer NOT NULL,
    venue_id integer NOT NULL,
    active_status boolean NOT NULL,
    first_name text NOT NULL,
    middle_name text,
    last_name text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT index_unique_customer_venue UNIQUE (venue_id, account_number)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.customers
    OWNER to postgres;
