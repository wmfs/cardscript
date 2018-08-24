module.exports = {
  'title': 'Simple demo view!',
  'widgets': [
    {
      'type': 'header',
      'attributes': {
        'heading': 'Register!',
        'desc': "Let's get to know each other a bit better...",
        'backgroundImage': 'happyPeople.jpg',
        'backgroundImageAltText': 'Beautiful people smiling around a laptop'
      }
    },
    {
      'id': 'name',
      'type': 'text',
      'attributes': {
        'heading': 'Name',
        'placeholder': 'e.g. Lucy Smith',
        'mandatory': true,
        'minCharacters': 1,
        'maxCharacters': 100,
        'help': 'Enter your full name here'
      }
    }
  ]
}
