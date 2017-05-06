# queryDruid
accomplish the http query to Druid server

# API
baseUrl : 10.19.248.14:3000
玫瑰图
  url : /rose/:city?limit=n
  param : limit - 汽车品牌个数

大数字
  url : /sum/:city?

车型排行
  url : /top/:city?limit=n
  param : limit - 汽车车型个数

相关度
  url : /relevancy/:model/:city?
  该路径参数中，model必须有



# build dataSource
 curl -X 'POST' -H 'Content-Type:application/json' -d @quickstart/car-schema.json localhost:8090/druid/indexer/v1/task

# run produce jar
java -cp target/GaussCode-1.0-SNAPSHOT.jar:/home/ary/.m2/repository/org/apache/kafka/kafka-clients/0.10.0.1/kafka-clients-0.10.0.1.jar:/home/ary/.m2/repository/org/slf4j/slf4j-api/1.7.16/slf4j-api-1.7.16.jar cn.enncloud.gauss.kafka.Main src/main/resources/conf


# cmds
## k8s

scp -P 7102 -r ./dev/druid/GaussCode/tmp docker@218.92.191.3:/home/docker/ary/druid/

scp -r docker@10.19.248.11:/home/docker/ary/druid/tmp ./

kubectl -n streaming-demo exec -it ecej-4038178220-jknnn bash

kubectl -n streaming-demo exec -it kafka1-3407731383-6sx61 bash


## druid
plyql -h broker1 -q "select * from demo"
curl -L -H'Content-Type: application/json' -XPOST --data-binary @quickstart/wikiticker-top-pages.json http://localhost:8082/druid/v2/?pretty





## kafka
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic demofrom --from-beginning


## java
java -cp GaussCode-1.0-SNAPSHOT.jar:kafka-clients-0.10.0.1.jar:slf4j-api-1.7.16.jar cn.enncloud.gauss.kafka.Main conf


## ssh
ssh -p 7102 docker@218.92.191.3
