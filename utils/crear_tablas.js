function crear_bases_datos() {

create table clientes (
  idcliente     integer not null primary key,
  codigo        not null varchar(10),
  nombre        not null varchar(100),
  fecha         not null date,
  tienda        not null varchar(2).
  telefono      varchar(10),
  recargas      integer,
  status          varchar(1)
  usadas        integer
);

create table tiendas (
  idtienda      integer not null primary key,
  codigo        not null varchar(2),
  nombre        not null varchar(100);
  status          varchar(1)
);

create table recargas (
  idrecarga     not null primary key,
  fecha         date,
  telefono      varchar(10),
  importe       double
  usuario       integer
);

create table usuarios (
    idusuario       integer not null primary key,
    email           varchar(100),
    password        varchar(100),
    nombre          varchar(100),
    status          varchar(1)
);

commit work;
}
