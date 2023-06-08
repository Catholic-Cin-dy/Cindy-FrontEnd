import React, {useCallback, useEffect, useState} from 'react';
import FormData from 'form-data';
import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Draggable from 'react-native-draggable';
const baseUrl = 'https://www.awesominki.shop';
const baseUrl2 = 'http://localhost:9000';

const headers = {
  'Content-Type': 'multipart/form-data',
  'X-AUTH-TOKEN': `eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJ1c2VySWQiOjIsImlhdCI6MTY3OTkyMjIwNSwiZXhwIjoxNzExNDU4MjA1fQ.A45bXqITjpGnywheSkEzfv5St2jD08DefUW2VQEbDpo`,
};

export default function CommWrite() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img, setImage] = useState('');
  const [img2, setImage2] = useState('');
  const [imgurl, setImgurl] = useState([]);
  const [preview, setPreview] = useState('');
  //스크롤 될 때마다 사진을 불러올 경우 현재의 갤러리를 어디까지 불러왔는지에 대한 저장 값
  const [galleryCursor, setGalleryCursor] = useState(null);
  const [galleryList, setGalleryList] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState(null);
  const [result, setResult] = useState([]);
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);
  const [currentImageX, setCurrentImageX] = useState(0);
  const [currentImageY, setCurrentImageY] = useState(0);
  const [textPositions, setTextPositions] = useState([]);

  const openPicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
      });

      setSelectedImage({uri: image.path});
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextChange = text => {
    setText(text);
  };
  const handleAddText = () => {
    setModalVisible(true);
  };
  const handleSaveText = () => {
    if (text.trim() !== '') {
      const position = {x: 0, y: 0}; // 입력한 텍스트의 위치 정보
      setTextPositions(prevPositions => [...prevPositions, position]);
      setText('');
    }
  };
  const renderTexts = () => {
    return textPositions.map((position, index) => (
      <Draggable
        key={index}
        x={position.x}
        y={position.y}
        onDrag={(event, gestureState) => {
          const {dx, dy} = gestureState;
          setTextPositions(prevPositions => {
            const updatedPositions = [...prevPositions];
            updatedPositions[index].x += dx;
            updatedPositions[index].y += dy;
            return updatedPositions;
          });
        }}>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => {
            navi;
            // setCurrentImageIndex(index);
            // 다른 화면으로 이동하는 로직
            // ...
          }}>
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      </Draggable>
    ));
  };

  const onChangeTitle = inputText => {
    setTitle(inputText);
  };

  const onChangeContent = inputText => {
    setContent(inputText);
  };

  const submitBtn = () => {
    const postBoard = {
      title: title,
      content: content,
      latitude: 11.12,
      longitude: 23.45,
      tags: [],
      imgFiles: [],
      imgTagList: [
        {
          imgTags: [
            {
              brandId: 1,
              x: 30,
              y: 67,
            },
            {
              brandId: 2,
              x: 251,
              y: 125,
            },
          ],
        },
      ],
    };

    const formData = new FormData();
    //const imgUrl = imgurl;
    //console.log('i am', imgUrl);

    formData.append('title', postBoard.title.toString());
    formData.append('content', postBoard.content.toString());
    formData.append('latitude', postBoard.latitude.toString());
    formData.append('longitude', postBoard.longitude.toString());
    formData.append('tags', postBoard.tags);
    formData.append(
      'imgTagList',
      JSON.stringify(postBoard.imgTagList).toString(),
    );

    formData.append('imgFiles ', imgurl);

    console.log('imgUrl 은 이거임', imgurl);

    const formList = formData._parts;

    const arrayValue = formData._parts;
    const objectValue = Object.fromEntries(arrayValue);

    console.log('formData마지막:', formData);

    axios
      .post(baseUrl + '/boards/write', formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response) {
          console.log(response.data);
        }
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('음 1' + error.response.data);
          console.log('음 2' + error.response.status);
          console.log('음 3' + error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('음 4' + error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          <Button title="이미지 선택" onPress={openPicker} />
          <View style={styles.imageContainer}>
            {selectedImage && (
              <Image source={selectedImage} style={styles.image} />
            )}
            {renderTexts()}
          </View>
        </View>
        <Text>제목을 작성해주세요</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
          placeholder="제목을 작성해주세요."
        />
        <Text> 내용을 작성해주세요</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeContent}
          value={content}
          placeholder="글을 작성해주세요."
        />
        <Button title="제출" onPress={submitBtn} />
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    marginLeft: 10,
    width: 380,
    height: 400,
    backgroundColor: 'gray',
  },
  map: {
    marginTop: 40,
    marginLeft: 5,
    width: 400,
    height: 200,
    backgroundColor: 'gray',
  },
  input: {
    marginTop: 40,
    marginLeft: 5,
    marginBottom: 30,
    width: 400,
    height: 200,
    backgroundColor: 'gray',
  },
  imageContainer: {
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  text: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});
