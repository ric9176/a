-- Initial Migration create the database structure and to seed the database

-- notifications Table
CREATE TABLE notifications (
  id SERIAL NOT NULL,
  created_date TIMESTAMP WITH TIME ZONE NOT NULL,
  effective_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  skus_data JSON[] NOT NULL,
  commercial_reason VARCHAR NOT NULL,
  buyer VARCHAR NOT NULL,
  buyer_guid VARCHAR NOT NULL,
  category_manager VARCHAR NOT NULL,
  category_manager_guid VARCHAR NOT NULL,
  supplier_guid VARCHAR NOT NULL,
  supplier_email VARCHAR NOT NULL
);
