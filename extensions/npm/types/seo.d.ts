export {};
declare global {
    interface MetaTags {
        title?: string;
        google?: string;
        charset?: string;
        googlebot?: string;
        description?: string;
        keywords?: string;
        viewport?: string;
        rating?: string;
        robots?: string;
        og?: MetaTagOG;
    }
    interface MetaTagOG extends MetaTags {
        url: string;
        image: string;
        title: string;
        video?: string;
        audio?: string;
        locale?: string;
        locales?: string;
        decription?: string;
        determiner?: string;
        site_name?: string;
        type: MetaTagOGType;
    }
    interface ImageMetaTagOG extends MetaTagOG {
        alt?: string;
        width?: string;
        height?: string;
        secure_url?: string;
    }
    interface MusicMetaTagOG extends MetaTagOG {
        disc?: string;
        track?: string;
    }
    interface MusicSongMetaTagOG extends MusicMetaTagOG {
        musician?: string;
        duration?: string;
    }
    interface MusicAlbumMetaTagOG extends MusicMetaTagOG {
        song?: string;
        music: string;
        musician?: string;
    }
    interface MusicPlaylistMetaTagOG extends MusicMetaTagOG {
        song?: string;
        creator?: string;
    }
    interface VideoMetaTagOG {
        actor?: string;
        role?: string;
        director?: string;
        writer?: string;
        duration?: string;
        release_date?: string;
        tag?: string;
    }
    interface VideoEpisodeMetaTagOG extends VideoMetaTagOG {
        series?: string;
    }
    interface ArticleMetaTagOG {
        tag?: string;
        author?: string;
        section?: string;
        modified_time?: string;
        published_time?: string;
        expiration_time?: string;
    }
    interface BookMetaTagOG {
        tag?: string;
        isbn?: string;
        author?: string;
        release_date?: string;
    }
    interface ProfileMetaTagOG {
        first_name?: string;
        last_name?: string;
        username?: string;
        gender?: string;
    }
    type MetaTagOGType = 'website' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other' | 'image' | 'profile' | 'book' | 'music.playlist' | 'music.album' | 'music.song' | 'image';
}
