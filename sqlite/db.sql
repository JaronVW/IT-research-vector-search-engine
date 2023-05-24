CREATE TABLE data(  
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    data_name TEXT
);

CREATE table related_data(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    data_id INTEGER NOT NULL,
    related_data_ID INTEGER NOT NULL,
    FOREIGN KEY (data_id) REFERENCES data(id)
    Foreign Key (related_data_ID) REFERENCES data(id)
);

insert into "data" (data_name) values ('data1'), ('data2'), ('data3'), ('data4'), ('data5');

insert into "related_data" (data_id, related_data_ID) values (1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (3, 4), (4, 5);
```