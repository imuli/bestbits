Meteor.publish("bits", function(){
	var fields = { title: 1, language: 1, code: 1, author: 1, vote: 1 };
	if(this.userId)
		fields["votes." + this.userId] = 1;
	return Bits.find({}, {
		sort: {vote: -1},
		fields: fields
	});
});
