import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';
import Back from 'react-native-vector-icons/Ionicons';
import { RadioButton } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useAuthContext } from '../../../context/AuthContext';
import Styles from './Styles';


function UpdateProfile() {
  const { user, updateUserProfile } = useAuthContext(); // Access user data and update function
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [profession, setProfession] = useState('');
  const [mobile, setMobile] = useState('');
  console.log("user",user)

  // Initialize the state with the user data from context
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setGender(user.gender);
      setImage(user.image);
      setProfession(user.profession);
      setName(user.name);
      setMobile(user.mobile);
    }
  }, [user]);

  // Function to select a photo from the gallery

  const selectPhoto = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true, // Keep base64 data, but compress image
      compressImageMaxWidth: 800,  // Reduce max width
      compressImageMaxHeight: 800, // Reduce max height
      compressImageQuality: 0.3,  // Compress the quality of the image
    }).then(image => {
      const data = `data:${image.mime};base64,${image.data}`;
      setImage(data);  // Set the image data
    });
  };
  
  // Update user profile and call API to update
  const updateProfile = () => {
    const formData = {
      name: name,
      image,
      email,
      profession,
      mobile,
      gender
    };

    console.log(formData); // For debugging, check the form data

    axios
      .post('http://172.16.50.49:5003/update-user', formData)
      .then(res => {
        console.log(res.data);
        if (res.data.status === "Ok") {
          // Update the user data in context (if necessary)
          updateUserProfile(formData);
          Toast.show({
            type: 'success',
            text1: 'Profile Updated',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Profile update failed',
          });
        }
      })
      .catch(err => {
        console.error(err);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
        });
      });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}>
      <View>
        <View style={Styles.header}>
          <View style={{ flex: 1 }}>
            <Back name="arrow-back" size={30} style={Styles.backIcon} />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={Styles.nameText}>Edit Profile</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>

        <View style={Styles.camDiv}>
          <View style={Styles.camIconDiv}>
            <Back name="camera" size={22} style={Styles.cameraIcon} />
          </View>

          <TouchableOpacity onPress={() => selectPhoto()}>
            <Avatar.Image
              size={140}
              style={Styles.avatar}
              source={{
                uri: image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC',
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Editable fields for profile update */}
        <View style={{ marginTop: 50, marginHorizontal: 22 }}>
          <View style={Styles.infoEditView}>
            <Text style={Styles.infoEditFirst_text}>Username</Text>
            <TextInput
              placeholder="Your Name"
              placeholderTextColor={'#999797'}
              style={Styles.infoEditSecond_text}
              onChange={e => setName(e.nativeEvent.text)}
              defaultValue={name}
            />
          </View>

          <View style={Styles.infoEditView}>
            <Text style={Styles.infoEditFirst_text}>Email</Text>
            <TextInput
              editable={false}
              placeholder="Your Email"
              placeholderTextColor={'#999797'}
              style={Styles.infoEditSecond_text}
              defaultValue={email}
            />
          </View>

          <View style={Styles.infoEditView}>
            <Text style={Styles.infoEditFirst_text}>Gender</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={Styles.radioView}>
                <Text style={Styles.radioText}>Male</Text>
                <RadioButton
                  value="Male"
                  status={gender === 'Male' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('Male')}
                />
              </View>
              <View style={Styles.radioView}>
                <Text style={Styles.radioText}>Female</Text>
                <RadioButton
                  value="Female"
                  status={gender === 'Female' ? 'checked' : 'unchecked'}
                  onPress={() => setGender('Female')}
                />
              </View>
            </View>
          </View>

          <View style={Styles.infoEditView}>
            <Text style={Styles.infoEditFirst_text}>Profession</Text>
            <TextInput
              placeholder="Profession"
              placeholderTextColor={'#999797'}
              style={Styles.infoEditSecond_text}
              onChange={e => setProfession(e.nativeEvent.text)}
              defaultValue={profession}
            />
          </View>

          <View style={Styles.infoEditView}>
            <Text style={Styles.infoEditFirst_text}>Mobile No</Text>
            <TextInput
              placeholder="Your Mobile No"
              placeholderTextColor={'#999797'}
              keyboardType="numeric"
              maxLength={10}
              style={Styles.infoEditSecond_text}
              onChange={e => setMobile(e.nativeEvent.text)}
              defaultValue={mobile}
            />
          </View>
        </View>

        {/* Update Button */}
        <View style={Styles.button}>
          <TouchableOpacity style={Styles.saveButton} onPress={updateProfile}>
            <Text style={Styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default UpdateProfile;
