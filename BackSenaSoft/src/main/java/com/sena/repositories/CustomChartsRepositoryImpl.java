package com.sena.repositories;

import java.time.ZoneId;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.AddFieldsOperation;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.ComparisonOperators;
import org.springframework.data.mongodb.core.aggregation.ConvertOperators;
import org.springframework.data.mongodb.core.aggregation.DateOperators;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.aggregation.SortOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.core.aggregation.Fields;

@Repository
public class CustomChartsRepositoryImpl implements CustomChartsRepository {

	private MongoTemplate mongoTemplate;
	
	public CustomChartsRepositoryImpl(MongoTemplate mongoTemplate) {
		this.mongoTemplate=mongoTemplate;
	}

	@Override
	public List<Document> getChartsOfCurrentYear() {
		AddFieldsOperation addFields=new AddFieldsOperation("docYear",DateOperators.DateToString.dateOf("dateFinishRent").toString("%Y").withTimezone(DateOperators.Timezone.fromZone(ZoneId.of("America/Bogota")))).addField("currentYear",DateOperators.DateToString.dateOf("$$NOW").toString("%Y").withTimezone(DateOperators.Timezone.fromZone(ZoneId.of("America/Bogota"))));
		
		MatchOperation match=new MatchOperation(Criteria.expr(ComparisonOperators.Eq.valueOf("docYear").equalTo("currentYear")));
		
		ProjectionOperation project=new ProjectionOperation().and(ConvertOperators.ToInt.toInt(DateOperators.DateToString.dateOf("dateFinishRent").toString("%m"))).as("month").andInclude("payAmount");
		
		GroupOperation group=new GroupOperation(Fields.fields("month")).sum("payAmount").as("total");
		
		SortOperation sort=new SortOperation(Sort.by("_id").ascending());

		Aggregation aggregation=Aggregation.newAggregation(Arrays.asList(addFields, match, project, group, sort));
		List<Document>results=mongoTemplate.aggregate(aggregation, "charts",Document.class).getMappedResults();
		return results;
	}

}
