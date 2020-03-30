function crear_bases_datos() {

create table clientes (
  idcliente     integer not null primary key auto_increment,
  codigo        varchar(10) not null,
  nombre        varchar(100) not null ,
  fecha         date not null ,
  tienda        varchar(2) not null ,
  telefono      varchar(10) not null ,
  recargas      integer not null,
  status        varchar(1) not null,
  usadas        integer not null 
);

create table tiendas (
  idtienda      integer not null primary key auto_increment,
  codigo        varchar(2) not null ,
  nombre        varchar(100) not null,
  status          varchar(1) not null
);

create table recargas (
  idrecarga     integer not null primary key auto_increment,
  fecha         date not null ,
  telefono      varchar(10) not null ,
  importe       double,
  usuario       integer
);

    
    
create table usuarios (
    idusuario       integer not null primary key auto_increment,
    email           varchar(100) not null ,
    password        varchar(100) not null ,
    nombre          varchar(100) not null ,
    status          varchar(1) not null 
);

commit work;
    
// insert into usuarios (idusuario, email, password, nombre, status) values (1, 'tronxx@gmail.com', 'master', 'A' );
    
commit work;
    
    
}
