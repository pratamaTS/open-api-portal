<script setup>
import avatar1 from '@images/avatars/profile_bw.jpg';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const token = localStorage.getItem('token')
const profile = ref(null)

onMounted(async () => {
  try {
      // const response = await axios.get('https://gateway.berkompeten.com/api/admin/profile', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      profile.value = {name: "Yodu Partner"};

      console.log("profile: ", profile);
      console.log("name: ", name);
    } catch (error) {
      console.log("err: ", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        // Redirect to login page if the response status is 401
        router.push('/login');
      }
    }
});

const profilePage = async () => {
  try {
    console.log("profile: ", profile)
    router.push('/profile/account');
  } catch (error) {
    console.error('Profile error:', error);
  }
};

const logout = async () => {
  try {
    // Make a request to the logout endpoint on your backend
    // const response = await axios.post('https://gateway.berkompeten.com/api/admin/logout', null, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // console.log("resp logout: ", response)

    // Clear the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('profile');

    // Redirect to the login page or perform any other necessary actions
    router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>

<template>
  <VListItemAction start v-if="profile">
    <VListItem>
      <template #prepend>
        <VListItemAction start>
          <VBadge
            dot
            location="bottom right"
            offset-x="3"
            offset-y="3"
            color="success"
            bordered
          >
            <VAvatar
              class="cursor-pointer"
              color="primary"
              variant="tonal"
            >
              <VImg :src="avatar1" />
            </VAvatar>
          </VBadge>
        </VListItemAction>
      </template>
      <VListItemTitle class="font-weight-semibold">
        {{ profile.name }}
      </VListItemTitle>
      <VListItemSubtitle>Admin</VListItemSubtitle>
    </VListItem>
    <!-- SECTION Menu -->
    <VMenu
      activator="parent"
      width="230"
      location="bottom end"
      offset="14px"
    >
      <VList>
        <!-- 👉 User Avatar & Name -->
        <VListItem>
          <template #prepend>
            <VListItemAction start>
              <VBadge
                dot
                location="bottom right"
                offset-x="3"
                offset-y="3"
                color="success"
              >
                <VAvatar
                  color="primary"
                  variant="tonal"
                >
                  <VImg :src="avatar1" />
                </VAvatar>
              </VBadge>
            </VListItemAction>
          </template>

          <VListItemTitle class="font-weight-semibold">
            {{ profile.name }}
          </VListItemTitle>
          <VListItemSubtitle>Admin</VListItemSubtitle>
        </VListItem>
        <VDivider class="my-2" />

        <!-- 👉 Profile -->
        <VListItem @click="profilePage">
          <template #prepend>
            <VIcon
              class="me-2"
              icon="ri-user-line"
              size="22"
            />
          </template>

          <VListItemTitle>Profile</VListItemTitle>
        </VListItem>

        <!-- Divider -->
        <VDivider class="my-2" />

        <!-- 👉 Logout -->
        <VListItem @click="logout">
          <template #prepend>
            <VIcon
              class="me-2"
              icon="ri-logout-box-r-line"
              size="22"
            />
          </template>

          <VListItemTitle>Logout</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <!-- !SECTION -->
  </VListItemAction>
</template>
