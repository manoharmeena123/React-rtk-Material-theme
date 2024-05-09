import type { FC } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';

import type { Post, Profile } from 'src/types/social';

import { SocialPostAdd } from './social-post-add';
import { SocialPostCard } from './social-post-card';
import { SocialAbout } from './social-about';

interface SocialProfileTimelineProps {
  posts?: Post[];
  profile: Profile;
}

export const SocialTimeline: FC<SocialProfileTimelineProps> = (props) => {
  const { posts = [], profile, ...other } = props;

  return (
    <div {...other}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          lg={4}
          xs={12}
        >
          <SocialAbout
            currentCity={profile.currentCity}
            currentJobCompany={profile.currentJobCompany}
            currentJobTitle={profile.currentJobTitle}
            email={profile.email}
            originCity={profile.originCity}
            previousJobCompany={profile.previousJobCompany}
            previousJobTitle={profile.previousJobTitle}
            profileProgress={profile.profileProgress}
            quote={profile.quote}
          />
        </Grid>
        <Grid
          lg={8}
          xs={12}
        >
          <Stack spacing={3}>
            <SocialPostAdd />
            {posts.map((post) => (
              <SocialPostCard
                key={post.id}
                authorAvatar={post.author.avatar}
                authorName={post.author.name}
                comments={post.comments}
                createdAt={post.createdAt}
                isLiked={post.isLiked}
                likes={post.likes}
                media={post.media}
                message={post.message}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

SocialTimeline.propTypes = {
  posts: PropTypes.array,
  // @ts-ignore
  profile: PropTypes.object.isRequired
};
