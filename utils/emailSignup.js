import {Box, AspectRatio, Center, Image, Text, Pressable} from 'native-base';
import React from 'react';
import {useColor} from '../Context/ColorContext';
import {ScreenName} from '../Navigators/GameNavigator/constants';

export default function Card({navigation, item}) {
  const {
    state: {theme},
  } = useColor();
  return (
    <Box
      bg={theme.bg}
      onStartShouldSetResponder={() =>
        navigation.navigate(ScreenName.GAMES_INFO_SCREEN, {
          item,
          name: item.name,
        })
      }
      width={'95%'}
      mx={2}
      shadow={theme.shadow}
      rounded={'xl'}
      mt={2}
      bg={theme.bg}>
      <Box mt={3}>
        <AspectRatio w="90%" mx={5} ratio={20 / 9}>
          <Image
            source={{
              uri: item.image_url,
            }}
            alt="image"
            rounded={'xl'}
          />
        </AspectRatio>
        {/* <Center
          bg="violet.500"
          _text={{
            color: 'warmGray.50',
            fontWeight: '700',
            fontSize: 'xs',
          }}
          position="absolute"
          bottom="5"
          left="7"
          px="3"
          py="1.5"
          borderRadius={5}>
          something
        </Center> */}
        <Center
          bg={theme.bg}
          _text={{
            color: theme.text,
            fontWeight: '700',
            fontSize: 'xs',
          }}
          position="absolute"
          top="2"
          right="7"
          px="3"
          py="1.5"
          borderRadius={5}>
          <Text color={theme.text}>{item.critics_rating}*</Text>
        </Center>
      </Box>
      <Center py={2}>
        <Text fontWeight={'extrabold'} fontStyle={'italic'} color={theme.text}>
          {item.name}
        </Text>
      </Center>
    </Box>
  );
}
