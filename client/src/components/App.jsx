import React from 'react';
import axios from 'axios';
import Namelist from './Namelist.jsx';
import RelatedTracks from './RelatedTracks.jsx';

let params = new URLSearchParams(window.location.search);

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userPictures: [],
            likes: 0,
            likeWord: 'likes',
            songInformation: []
        }
        this.onClickLikes = this.onClickLikes.bind(this);
        this.onClickProfiles = this.onClickProfiles.bind(this);
        this.countRelatedTracksLikes = this.countRelatedTracksLikes.bind(this);
    }

    componentDidMount () {
        var id = params.get('song_id');
        axios.get(`/related_tracks/${id}`)
        .then( (response) => {
            var array = [];
            for (var i = 0; i < response.data.length; i++) {
                var obj ={
                    followers: response.data[i].artist_followers,
                    user_location: "San Francisco",
                    user_picture_url: response.data[i].artist_picture_url,
                    username: response.data[i].artist_name,
                    username_id: i,
                    pro_account: true
                }
                array.push(obj)
            }

            var result = [];
            response.data.forEach((song, idx) => {
                var obj = {
                    category: 'Hip-Hop',
                    comments: song.comments,
                    likes: song.likes,
                    reposts: song.reposts,
                    song_id: song.song_id,
                    song_picture_url: song.song_picture_url,
                    times_played: song.times_played,
                    title: song.title,
                    username: song.artist_name,
                    username_id: idx
                }
                result.push(obj)
            })
            this.setState({ userPictures: array, songInformation: result })
        })
        .catch((err) => { console.log(err) } )

        // axios.get('/related_tracks/1')
        // .then( (response) => {
        //     var result = [];
        //     response.data.forEach((song, idx) => {
        //         var obj = {
        //             category: 'Hip-Hop',
        //             comments: song.comments,
        //             likes: song.likes,
        //             reposts: song.reposts,
        //             song_id: song.song_id,
        //             song_picture_url: song.song_picture_url,
        //             times_played: song.times_played,
        //             title: song.title,
        //             username: song.artist_name,
        //             username_id: idx
        //         }
        //         result.push(obj)
        //     })
        //     this.setState({
        //         songInformation: result
        //     })
        // })
        // .catch((err) => { console.log(err) })

    };


    countRelatedTracksLikes (data, songInfoObj) {
        var count = 0
        data.data.forEach( (songObj) => {
            if(songObj.song_id === songInfoObj.song_id){
                count++
            }
        })
        songInfoObj['likes'] = count;
    }

    onClickLikes () {
        alert('View all likes has been clicked')
    }

    onClickProfiles (username) {
        alert(`${username} has been clicked`)
    }


    render () {
        return (
            <div className='relatedTrackBlockContainer'>
            <div className='relatedTracksBlock'>
                <div className='header'>
                    <div className='iconWords'>
                        <div className='trackIcon' >

                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path fill="#999" d="M5 12h2v4H5zM21 12h2v4h-2zM17 10h2v8h-2zM9 8h2v12H9zM13 5h2v18h-2z"/></svg>
                        </div>
                        <div className='relatedTracksWritten'>{'Related tracks'}</div>
                    </div>
                    <div className='tracksViewall'>{'View all'}</div>
                </div>
                <div className='relatedTracksContainerWithPad'>
                    <div className='relatedTracksContainer'>
                        <ul className='relatedTracksContainer uLRelatedTracks'>
                            {this.state.songInformation.map( (songInformationObj, idx) => {
                                return(
                                <RelatedTracks solouser={this.state.userPictures} key={idx} song={songInformationObj} />
                                )
                            })
                            }
                        </ul>
                    </div>

                </div>
            </div>
            <div className='likeBlock'>
                <div className='header' >
                    <div onClick={this.onClickLikes} className='likeHeader'>
                        <span className='heartLikeBundle'>
                            <span className='heart'>

                                <svg width="20" height="20" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>stats_likes_grey</title><path d="M10.805 3c-2.02 0-2.804 2.345-2.804 2.345S7.213 3 5.196 3C3.494 3 1.748 4.096 2.03 6.514c.344 2.953 5.725 6.479 5.963 6.487.238.008 5.738-3.722 5.988-6.5C14.188 4.201 12.507 3 10.805 3z" fill="#999" fillRule="evenodd"/></svg>                            </span>
                            <span className='likeNumber'>{`${this.state.likes} ${this.state.likeWord}`}</span>
                        </span>
                        <span className='likeHeader viewAllLikes'>{'View all'}</span>
                    </div>
                    <div className='likeContainer'>
                        <ul className='profilePicture'>
                                {
                                this.state.userPictures.map( (pictureObj, idx) => {
                                    return(
                                    <Namelist key={idx} picture={pictureObj} clickProfile={this.onClickProfiles}/>                        )
                                })}
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default App;