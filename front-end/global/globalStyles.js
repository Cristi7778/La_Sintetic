import { StyleSheet } from 'react-native';
export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  image:{
    width:150,
    height:150,
    borderWidth:5,
    backgroundColor:'blue',
  },
  title:{
    marginVertical: 8,
    lineHeight: 20,
    fontSize:20,
  }
});