import {Dimensions, StyleSheet} from 'react-native';

const height = Dimensions.get('window').height * 1;
export default StyleSheet.create({
  loading: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    height: 1000,
  },
  button: {
    alignItems: 'center',
    marginTop: 0,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal:30,
    paddingVertical:20,
    paddingHorizontal:10,
    backgroundColor:'#24243E',
    borderRadius:10,
    fontWeight:'large'

  },
  saveButtonText:{
    color:'white'
  },
  
  textSign: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  inBut: {
    width: '70%',
    backgroundColor: '#0163D2',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  header: {
    backgroundColor: '#24243E',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 80,
    marginTop: 50,
    backgroundColor: 'white',
    height: 160,
    width: 160,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camDiv: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  camIconDiv: {
    position: 'absolute',
    right: 142,
    zIndex: 1,
    bottom: 5,
    height: 36,
    width: 36,
    backgroundColor: '#0163D2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  cameraIcon: {
    color: 'white',
  },
  backIcon: {
    marginLeft: 20,
    color: 'white',
  },
  nameText: {
    color: 'white',
    fontSize: 24,

    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoEditView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#e6e6e6',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  infoEditFirst_text: {
    color: '#7d7c7c',
    fontSize: 16,
    fontWeight: '400',
  },
  infoEditSecond_text: {
    color: 'black',
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'right',
  },
  radioView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioText: {
    color: 'black',
    fontSize: 15,
  },
});