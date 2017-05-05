# queryDruid
accomplish the http query to Druid server

# build dataSource
 curl -X 'POST' -H 'Content-Type:application/json' -d @quickstart/car-schema.json localhost:8090/druid/indexer/v1/task

# run produce jar
java -cp target/GaussCode-1.0-SNAPSHOT.jar:/home/ary/.m2/repository/org/apache/kafka/kafka-clients/0.10.0.1/kafka-clients-0.10.0.1.jar:/home/ary/.m2/repository/org/slf4j/slf4j-api/1.7.16/slf4j-api-1.7.16.jar cn.enncloud.gauss.kafka.Main src/main/resources/conf
