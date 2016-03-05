MoodReports = new Mongo.Collection("moodReports");

if (Meteor.isClient){
   Template.body.helpers({
     moodReports: function(){
       return MoodReports.find({}, {sort: {createdAt: -1}});
     }
   });

   Template.body.events({
     "submit #mood-report-form": function(event){
       event.preventDefault();
       var mood = event.target.mood.value;
       var notes = event.target.notes.value;

       MoodReports.insert({
         mood: mood,
         notes: notes,
         createdAt: new Date()
       });

       document.getElementById("mood-report-form").reset();

     }
   });
   Template.moodReport.events({
     "dblclick .editable": function(event, target){
       return Session.set("target" + target.data._id, true);
     },
     "dblclick .editable2": function(event, target){
       return Session.set("target2" + target.data._id, true);
     },
     "keypress .savable": function(event, target){
       if(event.keyCode == 13){
         MoodReports.update(this._id, {
           $set: {mood: event.currentTarget.value}
         });
         return Session.set("target" + target.data._id, false);
       }
     },
     "keypress .savable2": function(event, target){
       if(event.keyCode == 13){
         MoodReports.update(this._id, {
           $set: {notes: event.currentTarget.value}
         });
         return Session.set("target2" + target.data._id, false);
       }
     }
   });

   Template.moodReport.helpers({
     formatDate: function(date){
       return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
     },
     editing: function(){
       return Session.get("target" + this._id);
     },
     editing2: function(){
       return Session.get("target2" + this._id);
     }
   });
}

// if (Meteor.isClient) {
//   // counter starts at 0
//   Session.setDefault('counter', 0);
//
//   Template.hello.helpers({
//     counter: function () {
//       return Session.get('counter');
//     }
//   });
//
//   Template.hello.events({
//     'click button': function () {
//       // increment the counter when button is clicked
//       Session.set('counter', Session.get('counter') + 1);
//     }
//   });
// }
//
// if (Meteor.isServer) {
//   Meteor.startup(function () {
//     // code to run on server at startup
//   });
// }
