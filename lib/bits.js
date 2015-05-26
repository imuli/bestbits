Bits = new Mongo.Collection("bits");

Meteor.methods({
	addBit: function (title, language, code){
		if(!Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
		Bits.insert({
			title: title,
			language: language,
			code: code,
			vote: 0,
			votes: {},
			author: Meteor.user()._id
		});
	},
	vote: function (id, mag){
		var bit = Bits.findOne(id);
		if(!Meteor.userId()){
			throw new Meteor.Error("not-authorized");
		}
		var which = {};
		mag = mag > 0 ? 1 : mag < 0 ? -1 : 0;
		which["votes." + Meteor.user()._id] = mag;
		if(bit.votes !== undefined && bit.votes[Meteor.user()._id] !== undefined)
			mag -= bit.votes[Meteor.user()._id];
		Bits.update(id, {
			$set: which,
			$inc: { "vote": mag }
		});
	},
	removeBit: function (id){
		var bit = Bits.findOne(id);
		if(bit.author != Meteor.user()._id){
			throw new Meteor.Error("not-authorized");
		}
		Bits.remove(id);
	},
});
