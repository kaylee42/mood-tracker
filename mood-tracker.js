MoodReports = new Mongo.Collection("moodReports");

if (Meteor.isClient){
   Template.body.helpers({
     moodReports: function(){
       return MoodReports.find({});
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

   Template.moodReport.helpers({
     formatDate: function(date){
       return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
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
