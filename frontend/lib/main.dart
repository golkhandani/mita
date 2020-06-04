import 'package:video_player/video_player.dart';
import 'package:flutter/material.dart';

import 'models/session-model.dart';

void main() => runApp(App());

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: HomeScreen.id,
      routes: {
        HomeScreen.id: (context) => HomeScreen(),
        ProfileScreen.id: (context) => ProfileScreen(),
        VideoListScreen.id: (context) => VideoListScreen(),
      },
    );
  }
}

class HomeScreen extends StatelessWidget {
  static final String id = 'HomeScreen';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[800],
      appBar: buildAppBar(),
      body: Container(
        alignment: Alignment.center,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xfff6921e), Color(0xffee4036)],
          ),
        ),
        child: GridView(
          shrinkWrap: true,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
          ),
          children: [
            HomePageItem(
              title: "Who am I?",
              image: 'farshad.jpg',
              onPressed: () {
                print("object");
                Navigator.pushNamed(context, ProfileScreen.id);
              },
            ),
            HomePageItem(
              title: "Online courses.",
              image: 'student.png',
              onPressed: () {
                print("object");
                Navigator.pushNamed(context, VideoListScreen.id);
              },
            ),
            HomePageItem(
              title: "Ask question!",
              image: 'subject.png',
              onPressed: () {
                print("object");
              },
            ),
          ],
        ),
      ),
    );
  }
}

class HomePageItem extends StatelessWidget {
  const HomePageItem({
    Key key,
    this.title,
    this.image,
    this.onPressed,
  }) : super(key: key);
  final String title;
  final String image;
  final Function onPressed;
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          title,
          style: TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 20,
            color: Colors.white,
          ),
        ),
        SizedBox(
          height: 16,
        ),
        FlatButton(
          onPressed: onPressed,
          child: CircleAvatar(
            backgroundImage: AssetImage(image),
            radius: 100,
          ),
        ),
      ],
    );
  }
}

class ProfileScreen extends StatelessWidget {
  static final String id = 'ProfileScreen';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(),
      body: Container(
          alignment: Alignment.center,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Color(0xfff6921e), Color(0xffee4036)],
            ),
          ),
          child: Container(
            width: 560,
            child: ListView(
              children: [
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Center(
                    child: CircleAvatar(
                      backgroundImage: AssetImage('farshad.jpg'),
                      radius: 150,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    "Farshad Nejadsattari",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    "Dr Farshad Nejadsattari received his bachelor’s degree in Solid State Physics from the University of Tehran, Iran. He did his graduate studies in Photonics at the Laser and Plasma Research Institute at Iran’s Shahid Beheshti University, where he studied spintronics. His master’s thesis was a theoretical study on the generation of optically induced spin dependent currents through quantum dots. After receiving his master’s degree, he spent some time on writing and also translating a couple of textbooks on quantum mechanics into Persian. In the meantime, he worked as a part-time instructor of physics and mathematics at Iran’s University of Applied Sciences and Technology.",
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey[300],
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    "Farshad moved to Canada in 2011 to start his PhD program in condensed matter physics at the University of Ottawa and under the supervision of Professor Stadnik. His PhD work consisted of theoretical and experimental studies on the electronic structure, magnetic, and hyperfine interaction parameters of different novel compounds. After earning his PhD, Dr Nejadsattari joined Professor Karimi’s Structured Quantum Optics group to commence research in quantum simulations.",
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey[300],
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    "During his spare time, Farshad enjoys studying the history and philosophy of science and also participating in long intellectual discussions with his peers. He is a fan of classical music as well as late 60’s and early 70’s soft rock. As his favourite hobby from childhood, he loves astronomical observations. Going for early morning long walks beside the river is his favourite outdoor activity and he always likes teaching physics and mathematics to younger students.",
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey[300],
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                SizedBox(
                  height: 80,
                )
              ],
            ),
          )),
    );
  }
}

class VideoListScreen extends StatefulWidget {
  static final String id = 'VideoListScreen';

  @override
  _VideoListScreenState createState() => _VideoListScreenState();
}

class _VideoListScreenState extends State<VideoListScreen> {
  int selectedIndex = 0;
  final List<Session> sessions = [
    Session(
      title: "Test 1",
      description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer convallis non justo …",
      hls:
          "http://localhost:9000/users/videos/2020-06-02-19-56/DYlNukMp8F8O/1591111590311__test2.m3u8",
    ),
    Session(
      title: "Test 2",
      description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer convallis non justo …",
      hls:
          "http://localhost:9000/users/videos/2020-06-02-02-37/Sftzp3P8zJax/1591049221438__test_640x400.m3u8",
    ),
    Session(
      title: "Test 3",
      description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer convallis non justo …",
      hls: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    )
  ];
  VideoPlayerController _controller;
  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.network(sessions[selectedIndex].hls)
      ..initialize().then((_) {
        // Ensure the first frame is shown after the video is initialized, even before the play button has been pressed.
        setState(() {});
      });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.red,
      appBar: buildAppBar(),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xfff6921e), Color(0xffee4036)],
          ),
        ),
        child: Row(
          children: [
            VideoPlayerList(
              sessions: sessions,
              selectedIndex: selectedIndex,
              onPressed: (index) {
                setState(() {
                  selectedIndex = index;
                  _controller = VideoPlayerController.network(
                    sessions[selectedIndex].hls,
                  )..initialize().then((_) {
                      // Ensure the first frame is shown after the video is initialized, even before the play button has been pressed.
                      setState(() {});
                    });
                });
              },
            ),
            Expanded(
              flex: 3,
              child: VideoPlayerScreen(
                controller: _controller,
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: PausePlayButton(
        controller: _controller,
        onPressed: () {
          setState(() {
            _controller.value.isPlaying
                ? _controller.pause()
                : _controller.play();
          });
        },
      ),
    );
  }
}

class VideoPlayerList extends StatelessWidget {
  const VideoPlayerList({
    Key key,
    @required this.sessions,
    @required this.selectedIndex,
    this.onPressed,
  }) : super(key: key);

  final List<Session> sessions;
  final int selectedIndex;
  final Function onPressed;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 240,
      child: Flex(
        direction: Axis.vertical,
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              "List Of Videos",
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Flexible(
            child: ListView.builder(
              itemCount: sessions.length,
              itemBuilder: (context, index) {
                return VideoListItem(
                  session: sessions[index],
                  selectedIndex: selectedIndex,
                  onPressed: () => onPressed(index),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class VideoListItem extends StatelessWidget {
  const VideoListItem({
    Key key,
    this.onPressed,
    @required this.session,
    @required this.selectedIndex,
  }) : super(key: key);

  final Session session;
  final int selectedIndex;
  final Function onPressed;

  @override
  Widget build(BuildContext context) {
    return FlatButton(
      onPressed: onPressed,
      child: Center(
        child: Container(
            padding: EdgeInsets.all(16),
            child: Column(
              children: [
                Text(
                  session.title,
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  session.description,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w400,
                  ),
                ),
              ],
            )),
      ),
    );
  }
}

class VideoPlayerScreen extends StatelessWidget {
  const VideoPlayerScreen({
    Key key,
    @required VideoPlayerController controller,
  })  : _controller = controller,
        super(key: key);

  final VideoPlayerController _controller;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: _controller.value.initialized
            ? AspectRatio(
                aspectRatio: _controller.value.aspectRatio,
                child: VideoPlayer(_controller),
              )
            : Container(),
      ),
    );
  }
}

class PausePlayButton extends StatelessWidget {
  const PausePlayButton({
    Key key,
    @required this.controller,
    this.onPressed,
  });

  final VideoPlayerController controller;
  final Function onPressed;
  @override
  Widget build(BuildContext context) {
    return FloatingActionButton(
      backgroundColor: Color(0xffee4036),
      onPressed: onPressed,
      child: Icon(
        controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
      ),
    );
  }
}

AppBar buildAppBar() {
  return AppBar(
    backgroundColor: Colors.black,
    title: Text('Welcome!!!'),
    centerTitle: true,
  );
}

class VideoApp extends StatefulWidget {
  final String hls;
  VideoApp({this.hls});
  @override
  _VideoAppState createState() => _VideoAppState();
}

class _VideoAppState extends State<VideoApp> {
  VideoPlayerController _controller;
  // 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  @override
  void initState() {
    super.initState();
    print(widget.hls);
    _controller = VideoPlayerController.network(widget.hls)
      ..initialize().then((_) {
        // Ensure the first frame is shown after the video is initialized, even before the play button has been pressed.
        setState(() {});
      });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Video Demo',
      home: Scaffold(
        body: Center(
          child: _controller.value.initialized
              ? AspectRatio(
                  aspectRatio: _controller.value.aspectRatio,
                  child: VideoPlayer(_controller),
                )
              : Container(),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            setState(() {
              _controller.value.isPlaying
                  ? _controller.pause()
                  : _controller.play();
            });
            print(widget.hls);
          },
          child: Icon(
            _controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    super.dispose();
    _controller.dispose();
  }
}
