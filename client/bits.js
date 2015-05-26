Meteor.subscribe("bits");

Template.body.helpers({
	bits: function() {
		return Bits.find();
	}
});

Template.body.events({
	"submit .new-bit": function(event) {
		Meteor.call("addBit",
				event.target.title.value,
				event.target.language.value,
				event.target.code.value);
		event.target.title.value="";
		event.target.language.value="";
		event.target.code.value="";
		return false;
	}
});

Template.bit.helpers({
	canVote: function(n){
		var vote;
		if(this.votes === undefined || this.votes[Meteor.user()._id] === undefined)
			vote = 0
		else
			vote = this.votes[Meteor.user()._id];
		return vote != n;
	},
	isMine: function(){
		return this.author == Meteor.user()._id;
	}
});
Template.bit.events({
	"click .delete": function(event) {
		Meteor.call("removeBit", this._id);
	},
	"click .vote": function(event) {
		Meteor.call("vote", this._id, event.target.value);
	},
});

Template.bit.onRendered(function(){
	// do syntax highlighting here
	console.log(this.data._id)
	var el = document.getElementById(this.data._id);
	el.style.height = el.scrollHeight + "px";
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});
