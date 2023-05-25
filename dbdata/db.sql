-- Active: 1685009503184@@127.0.0.1@5433@postgres
DROP TABLE IF EXISTS data;


CREATE TABLE data(
    id SERIAL NOT NULL PRIMARY KEY,
    word TEXT
);

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX trigram_search_idx ON data 
USING GIN(word gin_trgm_ops);

-- Milvus sample data transfered over
insert into
    data (word)
VALUES
    ('ZnDgCG43tGHrWg3nAiFA4MS6FwWOTB'),
    ('PH8bDHQvQ4cqtyJuri5QfnjN3Kjtx4'),
    ('1VjZSAq5Pzmucfw6P4ywSXF8lor4L4'),
    ('eBp81878QmC3Bgvl6eTRBYS3OnakYA'),
    ('hp4ZBfZ3CsD4JMQxTqso1IsDGHqVCA'),
    ('keC9RrnKDanhWB3OGjhGbY4D26Cwyr'),
    ('4DVzUfY2TuleBIaBZCkS2F6aSBKGsB'),
    ('u9NtYmmUVXLuNuvOccgSkl94EtNyJl'),
    ('yy21MtHxMYAK16Mjovbsq2wXdlcPu3'),
    ('JqvKlfzpokTg3uUmZtTEMQor81eB0f'),
    ('YvwK52F2AMOTCbKCqrNfSKPkN5fokt'),
    ('YSALEiZGOXLb98ojVJJ6gxKxGPTePl'),
    ('X1eBLjqgMGkuOwy8ZNaYc2S4ytPr9K'),
    ('JuoVLMX0ZxvO1xqXMSz0SPlxP460VS'),
    ('6TxSocZutON6cxIjNk4Xr8kqYBMYzD'),
    ('ZaruOmw2qqqEvyAj6jrtd1Tr818KFM'),
    ('gyL7LqA9FrS4xIvL8wmyBhnn17iRz5'),
    ('fHknkU8uDJnykisSRpj4Liu4k0LJPl'),
    ('um9u5v1LeN4wtWgibIqlQ2YQm8ofNO'),
    ('Xm5om0GbGI2BHCa7dbC85kKuW6h9Wb'),
    ('AfDf1zpyHwQ0hJpocTCs4h7vimhOqQ'),
    ('4k4S5twy1X5toBjBeENRVJLqxsVet5'),
    ('kLsGvbxX9kldLmdLfWER592rJh1C3r'),
    ('9u2lKaXT2uYDG34Bk1EWg6BMjqRwqY'),
    ('SfdfESOJysdqxHmqNM1vCVrrqht5iL'),
    ('FlNZZoitVlDoo6rjIs50xOnUfmBuyG'),
    ('0u5CuBpeR1kTzQ4Lnj2ckvQdg4zk4B'),
    ('riJUVyPrBCfZxx4XwSJnvryyLEQyFW'),
    ('MG678ULSaPweIBTti95UAM6X92Je43'),
    ('el40OFIeyTihVJWaHUeccP0n0i5I2k'),
    ('pMZIMZFa0JtbRKR36iWyQ6wU2o4rD7'),
    ('ZnTPtCMzB1tSvYRm9YL0nxXwyrMwLh'),
    ('6BiUGZYbErfF96n1Z20Z153HZxqJoJ'),
    ('2zSCwLZoAd1uJpgSi7khy1SZDvtgaF'),
    ('v0bAXCX1joNIOaL6S3uoLbm4TkdDax'),
    ('hY3kRkQ7NFHAJVc92rqrJSgKR98ASb'),
    ('9tOZuC7dRH7IhOhuTl6nzOLs2n4nfI'),
    ('TmjFA5Gl3dbl9QSIv9lJr0xyo0lNko'),
    ('W5FqMABWb4tfQNMxEg3GW2tXN2SWLi'),
    ('62Mp1KerNPN5wsvOuhdzbHveoAEMKn'),
    ('Zib6BIcVxvD2Mo4bCqDbWVAUMyqXFq'),
    ('WCHHmrdgX9sVOqjKJiiGqG5B5tUDnm'),
    ('hSeV4pLrkLuKM2EEueb7aORvfhyqRH'),
    ('V6SRCZdgcLSnQu55slcuszUEhi5pIM'),
    ('7m5IGSaXJKZ6MFAbfujpT8wRvyKpkr'),
    ('Dgj2REA2CsyQBqp1ngS6BuIuCim05T'),
    ('VminjZST0AZPwNdzkqlirgvCtlDbg1'),
    ('0nktyY0sWmz92WdMMJyxMWyFIeqnW0'),
    ('CWO0ijxYvk5YtPcndx9Qf0BhJkVuG2'),
    ('T58QKZC1hAL5NUGoHPGjm59VevWB9R'),
    ('jjhnBH0Uq0vffwToWU1h6wWHl5IeK0'),
    ('8G7NJS5byEjIKNOZV9DpzdOyz2Pcc8'),
    ('LzbjYEkUQ1wK0lbkAPG9OLFgPtv07P'),
    ('fHcMj3LYHHZx9LzUwcsOErbss8kpNb'),
    ('5DN3LEnRr4VNearLQhHaDESzRraGG0'),
    ('3WMvQBajSocGJgJKFrqEZD6ImzHC5B'),
    ('QgvQ2vOkgz3ZkxdXso6vAuoyMN7TT2'),
    ('00l4Z8UBeYyRtY94qUfzUOot09D8e7'),
    ('5CleXZ22HkW9USZlLh0ucc15XDu18P'),
    ('JgBLJPxjnZmAd7EjUd3AsKC5nYfsbK'),
    ('5WFZrHXMIvLJ4qZgWHlUx5RfH81MBP'),
    ('5seYXqVKxqtRAYIdbkS3dSpKSx9IR5'),
    ('TIUiAn42Pu7OvEYx7cJUHOUDHct4zy'),
    ('CxMjqMaUsWQMVJu4PeE19rYZHE5zit'),
    ('QtnRKzFW0kWVyDB5WIoEIVcAmwMwdH'),
    ('Z63TRRGbfYlvOPK7iYmuBrFseCqmB6'),
    ('O9fsE7HcQS8dk096TuzFSWh1VG1y63'),
    ('PEsOaMbDM1Z4AoAU3ElXZVJ0nvZLUp'),
    ('OV13BWnMv5uOap0sJF1WpbAPO9w9iT'),
    ('EWaKx7CllWIUvXWSwWXLyC3AWXa0nk'),
    ('oeB34AbmmUMXvwoxTS7T8GI8fDNEkA'),
    ('7t5butMzZmaKGsafwOHL7wAPAh5Hmf'),
    ('lOqRl1yjTmRKT6iY2CBvmHfSas6crZ'),
    ('2uUae6ZaHNKQji4giqARNv6MB2lfnZ'),
    ('BSgd9wAQxQezkYIY1JwnKfuSTEgxP4'),
    ('iFuDgx8k2vWqJhcPWTj8fPjhuZK6Dm'),
    ('X1uhbJ1WEpRYO564j9S9Lb1SnZrauF'),
    ('btPQJmItecJogu3XzSIUZ3nUyEkYTl'),
    ('9uqD34Bi7tnGJ35LgQ1XAqYpeL2EqK'),
    ('deyftgv2sgcSFTiwkFiJQJpjVntK6c'),
    ('EseXN6MWYU0UiN4SudXfMxb8ZW6xpL'),
    ('OKPdcxbPxrjLMDbZysnHPdXFPDJIYK'),
    ('UENNAvxii3xUhSZrmCgEBZJ73AKOOY'),
    ('eteTAatpKUwtmLNCCWp4cnwoXMgF8S'),
    ('myvvEZfxZDMdnDeAmUYdkJ1eF7S7pb'),
    ('k2tsNV1614YMUI9SjXUKg9VxkUjahY'),
    ('0zFE8TJ6kuGHsb5bc8V4p6WcvZQPgT'),
    ('pyRATaBzFmEVeH4ip9ZvRjZuLZg35p'),
    ('HbtIDbhPLt9xRe1enbeDALFhfmChqg'),
    ('h04F4olYqJh2eGRJbnYsERcrj5mnS4'),
    ('UkGBY4F4rQn7tDJqLW52wgrMrDoEdk'),
    ('1b5qyRMmxsMhqBhNh5IFpMYP6xTikB'),
    ('AHuQZKZumwTM75BDfea6vAtc1t1QcK'),
    ('yzcabMyIBm7LYauIVAB8tiiLk8FWmO'),
    ('P3Clm1wOwF4THw9QPe86e05Qzcn5Fr'),
    ('gEEk2L6K3SKmJJGXKXiFQ0LR9TwJy5'),
    ('4do7Saegx2XjeDm9xHi94Ff6leXZRb'),
    ('y34jTNfDiWZxylpDqIjiX9DVz2IVAc'),
    ('PIy6FEAHqlZ8cjbc8GSFE6gXp6zSAF'),
    ('CuqDrelG3S4u3JtnDvtHPfi7Hlx3m4');


CREATE FUNCTION word_update_index() RETURNS trigger AS $$
BEGIN
new.word := new word;
return new;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER word_update_index BEFORE INSERT OR UPDATE ON data FOR EACH ROW EXECUTE PROCEDURE word_update_index();

